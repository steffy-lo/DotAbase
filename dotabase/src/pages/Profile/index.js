import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import ProfileDetail from "./ProfileDetail";
import SearchProfiles from "./Search";

export default createStackNavigator({
    Home,
    ProfileDetail,
    SearchProfiles
}, { headerMode: "none" });