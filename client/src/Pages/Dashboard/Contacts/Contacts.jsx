import { FaUserPlus } from "react-icons/fa";


const contacts = [
    {
        _id: 1,
        name: "Shihab Hasan",
        email: "shihabbd018@gmail.com",
        photo: "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"
    },
    {
        _id: 2,
        name: "Shihab Hasan",
        email: "shihabbd018@gmail.com",
        photo: "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"
    },
    {
        _id: 3,
        name: "Shihab Hasan",
        email: "shihabbd018@gmail.com",
        photo: "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"
    }
]



const Contacts = () => {
    return <div className="p-4">

        {/* Create new Contacts */}
        <div className="flex items-center gap-4 justify-center border border-primary rounded-lg py-4 ">
            <span className="text-2xl"><FaUserPlus /></span>
            <button className="font-medium text-lg"> Create new contact</button>
        </div>


        {/* Available Contacts */}
        {
            contacts?.map(contact => {
                const { name, email, photo, _id } = contact;

                return <li key={_id} className="list-none flex items-center mt-6 gap-3 border py-2 px-5 rounded-lg border-primary">
                    <img className="w-12 h-12 rounded-full" src={photo} alt="" />
                    <div>
                        <h3 className=" font-semibold">{name}</h3>
                        <p className="font-medium text-sm text-gray-500">{email}</p>
                    </div>
                </li>
            })
        }



    </div>
}

export default Contacts