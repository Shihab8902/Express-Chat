
import Desktop from "../../Layouts/Desktop";
import Mobile from "../../Layouts/Mobile";


const DashBoard = () => {



    return <section className="container mx-auto ">

        {/* For mobile screens */}
        <div className="lg:hidden">
            <Mobile />
        </div>


        {/* For desktop and laptop screens */}
        <div className="hidden lg:block">
            <Desktop />
        </div>







    </section>





}

export default DashBoard