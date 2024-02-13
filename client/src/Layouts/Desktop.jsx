import ProfilePreview from "../Components/User/ProfilePreview";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Chats from "../Pages/Dashboard/Chats/Chats";
import Contacts from "../Pages/Dashboard/Contacts/Contacts";
import { Outlet } from "react-router-dom";




const Desktop = () => {

    return <div className="flex ">

        {/* aside section */}
        <aside className=" w-4/12 border-r h-screen hidden lg:block overflow-y-auto flex-shrink-0">
            <div className='p-5 flex justify-between items-center bg-green-600'>
                <h3 className='text-xl text-white  font-bold'>Express Chat</h3>
                <ProfilePreview />
            </div>

            <Tabs>
                <TabList className="bg-green-600 flex justify-evenly items-center text-white font-semibold ">
                    <Tab className="border-none flex-1 text-center py-2 outline-none cursor-pointer">Chats</Tab>
                    <Tab className="border-none flex-1 text-center py-2 outline-none cursor-pointer">Contacts</Tab>
                </TabList>

                <TabPanel>
                    <Chats />
                </TabPanel>

                <TabPanel>
                    <Contacts />
                </TabPanel>
            </Tabs>

        </aside>


        {/* Main section */}
        <div className=" h-screen w-full ">
            <Outlet />
        </div>





    </div>
}

export default Desktop