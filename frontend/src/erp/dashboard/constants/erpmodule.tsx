import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaAmericanSignLanguageInterpreting, FaMobileAlt, FaUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";

export const erpModule = [
    {
        label: "Inventory Management",
        // icon: "",
        path: ""
    },
    {
        label: "Inventory Management",
        // icon: "",
        path: ""
    },
    {
        label: "Human Resource Management",
        // icon: "",
        path: ""
    },
    {
        label: "Finance & Accounting",
        // icon: "",
        path: ""
    },
    {
        label: "Customer Relations",
        // icon: "",
        path: ""
    },
    {
        label: "Supply-Chain Management",
        icon: "",
        path: ""
    },
    {
        label: "Sales Pipeline",
        // icon: "",
        path: ""
    }
]

export const modules = [
    {
        id: "inventory",
        title: "Inventory Control",
        description: "Stock management & warehousing",
        icon: <>{FaMobileAlt({})}</>,
        gradient: "from-purple-500 to-purple-600",
        stats: { value: "2,847", label: "Items in Stock", trend: "-2%" },
        path: "/inventory",
      },
    {
      id: "crm",
      title: "Customer Relations",
      description: "Manage leads, customers & sales pipeline",
      icon: <>{FaUser({})}</>,
      gradient: "from-blue-500 to-blue-600",
      stats: { value: "1,234", label: "Active Customers", trend: "+12%" },
      path: "/crm",
      isActive: true,
    },
    {
      id: "hrm",
      title: "Human Resources",
      description: "Employee management & payroll",
      icon: <>{FaUserCheck({})}</>,
      gradient: "from-emerald-500 to-emerald-600",
      stats: { value: "156", label: "Employees", trend: "+3%" },
      path: "/hrm",
    },
    
    {
      id: "finance",
      title: "Finance & Accounting",
      description: "Financial management & reporting",
      icon: <>{FaAmericanSignLanguageInterpreting({})}</>,
      gradient: "from-amber-500 to-amber-600",
      stats: { value: "$125.4K", label: "Monthly Revenue", trend: "+18%" },
      path: "/finance",
    },
    {
      id: "sales",
      title: "Sales Pipeline",
      description: "Deals, quotes & order management",
      icon: "",
      gradient: "from-rose-500 to-rose-600",
      stats: { value: "89", label: "Active Deals", trend: "+25%" },
      path: "/sales",
    },
    {
      id: "procurement",
      title: "Procurement",
      description: "Purchase orders & vendor relations",
      icon: <>{AiOutlineShoppingCart({})}</>,
      gradient: "from-indigo-500 to-indigo-600",
      stats: { value: "45", label: "Suppliers", trend: "+5%" },
      path: "/procurement",
    },
  ]
  