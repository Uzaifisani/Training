import React from 'react';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  Drawer,
  DrawerContent,
  BoxProps,
  FlexProps,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout: performLogout } = useAuthStore();
  const navigate = useNavigate();
  const logout = () => {
    performLogout();
    navigate("/");
  };

  return (
    <Box>
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const { logout: performLogout } = useAuthStore();

  const logout = () => {
    performLogout();
    navigate("/");
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          AdminPanel
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <NavItem icon={FiHome} path="/dashboard">
        Dashboard
      </NavItem>
      <NavItem icon={FiUser} path="/dashboard/users">
        User
      </NavItem>
      <NavItem icon={FiLogOut} path="/" onClick={logout}>
        Logout
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: React.ComponentType;
  path: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ icon, path, children, ...rest }) => {
  return (
    <Link
      as={RouterLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('blue.50', 'gray.700'),
          color: useColorModeValue('blue.600', 'white'),
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: useColorModeValue('blue.600', 'white'),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default Sidebar;