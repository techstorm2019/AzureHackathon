const HeaderItems = [
    {
        label: "Dashboard",
        link: "/",
        activeNav: "dashboard",
        subNavItems:[]
    },
    {
        label: "Shipment",
        link: "/shipment",
        activeNav: "shipment",
        subNavItems:[]
    },
    {
        label: "Manage",
        link: "/manage",
        activeNav: "manage",
        subNavItems:[]
    },
    {
        label: "Admin",
        link: "#",
        activeNav: "admin",
        subNavItems:[
            {
                label: "User Management",
                link: "/admin",
                activeNav: "admin"
            },
            {
                label: "Customer Management",
                link: "/admin",
                activeNav: "admin"
            },
        ]
    }
];

export default HeaderItems;