import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, BuildingOffice2Icon, VideoCameraIcon, 
  ChatBubbleBottomCenterTextIcon, ChartBarIcon, ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Bosh Sahifa', href: '/', icon: HomeIcon },
  { name: 'Muassasalar', href: '/institutions', icon: BuildingOffice2Icon },
  { name: 'Videolar', href: '/videos', icon: VideoCameraIcon },
  { name: 'Kommentlar', href: '/comments', icon: ChatBubbleBottomCenterTextIcon },
  { name: 'Statistika', href: '/stats', icon: ChartBarIcon },
];


const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
      <h2 className="text-3xl font-semibold text-gray-800">SMM Panel</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
    <nav>
    {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700 ${
                  isActive ? 'bg-gray-200 text-gray-700' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Chiqish tugmasi */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Chiqish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   HomeIcon,
//   BuildingOffice2Icon,
//   VideoCameraIcon,
//   ChatBubbleBottomCenterTextIcon,
//   ChartBarIcon
// } from '@heroicons/react/24/outline';

// const navigation = [
//   { name: 'Bosh Sahifa', href: '/', icon: HomeIcon },
//   { name: 'Muassasalar', href: '/institutions', icon: BuildingOffice2Icon },
//   { name: 'Videolar', href: '/videos', icon: VideoCameraIcon },
//   { name: 'Kommentlar', href: '/comments', icon: ChatBubbleBottomCenterTextIcon },
//   { name: 'Statistika', href: '/stats', icon: ChartBarIcon },
// ];

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
//       <h2 className="text-3xl font-semibold text-gray-800">SMM Panel</h2>
//       <div className="flex flex-col justify-between flex-1 mt-6">
//         <nav>
//           {navigation.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               className={({ isActive }) =>
//                 `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700 ${
//                   isActive ? 'bg-gray-200 text-gray-700' : ''
//                 }`
//               }
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="mx-4 font-medium">{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
