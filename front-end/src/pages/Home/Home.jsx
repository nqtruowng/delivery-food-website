import React from 'react';

import './Home.scss';
import Presentation from '../../components/Presentation/Presentation';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';

const Home = () => {
    return (
        <div>
            <Presentation />
            <ExploreMenu />
        </div>
    );
};

export default Home;
