import "bootstrap/dist/css/bootstrap.min.css";
import { MenuTabs } from "./Modules/HomeModule";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
// import CurrentComponent from "./Components/currentComponent/currentcomponent";
import DraggableDialog from "./Components/login/login";
const App = () => {
  const navigate = useNavigate();

  const { currentUser, signOut } = useContext(FireBaseAuthContext);
  const defaultRoute = MenuTabs.find((tab) => tab.index == 0);
  const [activeTab, setActiveTab] = useState(defaultRoute?.index);
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        // Send the email and password to firebase
        debugger;
        const userCredential = await signInUser(
          "sivanormsoft@gmail.com",
          "Prasanth@24"
        );
        if (userCredential) alert("Login Successfully");
        else alert("invalid Credentials");
      } catch (error: any) {
        alert("User Sign In Failed due to Error");
      }
    };
    handleSubmit();
  }, []);

  useEffect(() => {
    if (!currentUser) setActiveTab(0);
  }, [currentUser]);
  return (
    <div className="App">
      <header className="App-header">
        <div className="main_title">
          <h1 className="my-title">
            Ramanujan Academy
            <span className="profile_icon">
              <DraggableDialog />
            </span>
          </h1>
        </div>
        <div className="nav_div">
          <ul className="jb_nav">
            {MenuTabs.map((tab) => (
              <li>
                <NavLink
                  id={"Nav_" + tab.id}
                  to={tab.path}
                  className={
                    activeTab == tab.index
                      ? "menu_nav menu_nav_active"
                      : "menu_nav"
                  }
                  onClick={() => {
                    if (!currentUser) {
                      //if Log out Add code
                      setActiveTab(0);
                    } else setActiveTab(tab.index);
                  }}
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
            <li onClick={signOut}>Log Out</li>
          </ul>
        </div>
      </header>
      {(activeNav == "hm" && <HomeComponent></HomeComponent>) ||
        (activeNav == "crs" && <CoursesComponent></CoursesComponent>) ||
        (activeNav == "gl" && <GalleryComponent></GalleryComponent>)}
    </div>
  );
};
export default App;
