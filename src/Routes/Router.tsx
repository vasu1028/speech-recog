import DashboardPage from '../content/dashboard/dashboard';
import Login from '../content/login/login';
import Profile from '../content/profile/profile';
import Registration from '../content/registration/registration';
import VoiceAnalyzer from '../content/voiceAnalyzer/voiceAnalyzer';
import Voices from '../content/voices/voices';
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";


const routes = [{
        path: "/dashboard",
        sidebarName: "Dashboard",
        navbarName: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        type: "sideBar"
    },
    {
        path: "/profile",
        sidebarName: "User Profile",
        navbarName: "Profile",
        icon: Person,
        component: Profile,
        type: "sideBar"
    },
    {
        path: "/voiceAnalyzer",
        sidebarName: "Voice Analyzer",
        navbarName: "Voice Analyzer",
        icon: BubbleChart,
        component: VoiceAnalyzer,
        type: "sideBar"
    },
    {
        path: "/voices",
        sidebarName: "Voices",
        navbarName: "Voices",
        icon: LibraryBooks,
        component: Voices,
        type: "sideBar"
    },
    {
        path: "/login",
        sidebarName: "Login",
        navbarName: "Login",
        icon: "",
        component: Login,
        type: "header"
    },
    {
        path: "/register",
        sidebarName: "Register",
        navbarName: "User Registration",
        icon: "",
        component: Registration,
        type: "header"
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect", component: DashboardPage }];

export default routes;