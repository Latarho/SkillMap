import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTabIndexByPath } from '../config/navigation';

export const useNavigation = (isMobile) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const tabIndex = getTabIndexByPath(location.pathname);
    setCurrentTab(tabIndex);
  }, [location.pathname]);

  const handleNavigation = (path, index) => {
    setCurrentTab(index);
    navigate(path);
    
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return {
    currentTab,
    mobileOpen,
    handleNavigation,
    handleDrawerToggle,
  };
};

export default useNavigation;

