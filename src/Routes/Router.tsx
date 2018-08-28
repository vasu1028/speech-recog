import DashboardPage from '../content/dashboard/dashboard';
import Login from '../content/login/login';
import Profile from '../content/profile/profile';
import Registration from '../content/registration/registration';
import VoiceAnalyzer from '../content/voiceAnalyzer/voiceAnalyzer';
import DemoVoices from '../content/voices/voices';
import MyRecordings from '../content/myRecordings/myRecordings';
import CompareVoices from '../content/compareVoices/comparevoices';
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import GraphicEq from "@material-ui/icons/GraphicEq";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";


const routes = [{
        path: "/profile",
        sidebarName: "User Profile",
        navbarName: "Profile",
        icon: Person,
        component: Profile,
        type: "header"
    },
    {
        path: "/dashboard",
        sidebarName: "Dashboard",
        navbarName: "Dashboard",
        icon: BubbleChart,
        component: DashboardPage,
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
        component: DemoVoices,
        type: "sideBar"
    },
    {
        path: "/myRecordings",
        sidebarName: "My Recordings",
        navbarName: "My Recordings",
        icon: LibraryBooks,
        component: MyRecordings,
        type: "voices"
    },
    {
        path: "/compareVoices",
        sidebarName: "Compare Voices",
        navbarName: "Compare Voices",
        icon: GraphicEq,
        component: CompareVoices,
        type: "sideBar"
    },
    {
        path: "/voiceChart",
        sidebarName: "Voice Chart",
        navbarName: "Voice Chart",
        icon: Dashboard,
        component: DashboardPage,
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
