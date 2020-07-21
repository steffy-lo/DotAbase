import { createStackNavigator } from 'react-navigation-stack';
import HeroProfile from './HeroProfile';
import Search from './Search';

export default createStackNavigator({
    Search,
    HeroProfile
}, { headerMode: "none" });