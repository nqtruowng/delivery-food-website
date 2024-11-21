import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import { Chart } from 'chart.js/auto'
Chart.register(CategoryScale)

import './Analytics.scss'
import axios from 'axios'

function calculateMonthlySum(dataArray) {
    const resultArray = Array.from({ length: 12 }, (_, index) => {
        const month = (index + 1).toString().padStart(2, '0')
        return { month, total: 0 }
    })

    const monthlyTotals = {}

    dataArray.forEach((item) => {
        if (item.date) {
            const date = new Date(item.date)
            const month = date.getUTCMonth() + 1
            const monthKey = month.toString().padStart(2, '0')

            if (!item.amount || isNaN(item.amount)) {
                return
            }

            if (!monthlyTotals[monthKey]) {
                monthlyTotals[monthKey] = 0
            }
            monthlyTotals[monthKey] += item.amount
        }
    })

    resultArray.forEach((item) => {
        if (monthlyTotals[item.month]) {
            item.total = monthlyTotals[item.month]
        }
    })
    return resultArray
}

function calculateTotalByCategory(dataArray, categories) {
    const resultArray = categories.map((category) => ({
        category,
        total: 0,
    }))

    dataArray.forEach((order) => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach((item) => {
                if (item.category && item.price && !isNaN(item.price)) {
                    const categoryObj = resultArray.find(
                        (obj) => obj.category === item.category
                    )
                    if (categoryObj) {
                        categoryObj.total += item.price
                    }
                }
            })
        }
    })
    return resultArray
}

const currentYear = new Date().getFullYear();
const years = []
for (let year = 2023; year <= currentYear; year++) {
    years.push(year)
}

const Analytics = () => {
    const [orders, setOrders] = useState()
    const [revenueData, setRevenueData] = useState([])
    const [barData, setBarData] = useState([])
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const categories = ['Appetizer', 'Salad', 'Pizza', 'Pasta', 'Desserts']
    const labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    useEffect(() => {
        ;(async () => {
            const orders = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/order/list/${currentYear}`
            )
            if (orders.data.success) {
                setOrders(orders.data.data)
                setRevenueData(calculateMonthlySum(orders.data.data))
                setBarData(
                    calculateTotalByCategory(orders.data.data, categories)
                )
            }
        })()
    }, [])

    const handleYearChange = (event) => {
        (async () => {
            const orders = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/order/list/${event.target.value}`
            )
            if (orders.data.success) {
                setOrders(orders.data.data)
                setRevenueData(calculateMonthlySum(orders.data.data))
                setBarData(
                    calculateTotalByCategory(orders.data.data, categories)
                )
            }
        })()
        setSelectedYear(event.target.value)
    }

    console.log(revenueData, barData, orders, years)

    return (
        <div className="chart">
            <select className="yearSelect" value={selectedYear} onChange={handleYearChange}>
                {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
                ))}
            </select>
            <div className="line_chart">
                <Line
                    data={{
                        labels: labels.map((month) => month),
                        datasets: [
                            {
                                label: 'Revenue',
                                data: revenueData.map((data) => data.total),
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
                            },
                        ],
                    }}
                />
            </div>
            <div className="bar_chart">
                <Bar
                    data={{
                        labels: categories.map((categorie) => categorie),
                        datasets: [
                            {
                                label: 'Revenue per category',
                                data: barData.map((data) => data.total),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(255, 159, 64, 0.5)',
                                    'rgba(255, 205, 86, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                ],
                                borderRadius: 5,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default Analytics
