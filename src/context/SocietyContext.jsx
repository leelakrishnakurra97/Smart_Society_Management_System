import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const SocietyContext = createContext();

export const SocietyProvider = ({ children }) => {
  // Theme state - Default to Light theme
  const [darkMode, setDarkMode] = useState(false);

  // Active view tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // User & Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('civicnest_token'));
  const [authLoading, setAuthLoading] = useState(true);

  // Application Data States
  const [flats, setFlats] = useState([]);
  const [bills, setBills] = useState([]);
  const [payments, setPayments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notices, setNotices] = useState([]);
  const [maintenanceConfig, setMaintenanceConfig] = useState({
    sqftRate: 2.5,
    fixedWaterCharge: 400,
    elevatorCharge: 350,
    securityCharge: 600,
    parkingCharge: 300,
    lateFeeAmount: 250
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Helper notification trigger
  const showToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Initial Auth Check
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('civicnest_token');
      if (storedToken) {
        try {
          const res = await api.getMe();
          setCurrentUser(res.user);
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          localStorage.removeItem('civicnest_token');
          setToken(null);
          setCurrentUser(null);
        }
      }
      setAuthLoading(false);
    };

    initAuth();
  }, []);

  // Fetch Application Data when Auth status changes
  const refreshAllData = async () => {
    if (!token && !currentUser) return;
    setLoading(true);
    try {
      const [flatsData, billsData, paymentsData, complaintsData, bookingsData, noticesData, configData] = await Promise.allSettled([
        api.getFlats(),
        api.getBills(),
        api.getPaymentHistory(),
        api.getComplaints(),
        api.getBookings(),
        api.getNotices(),
        api.getMaintenanceConfig()
      ]);

      if (flatsData.status === 'fulfilled') setFlats(flatsData.value);
      if (billsData.status === 'fulfilled') setBills(billsData.value);
      if (paymentsData.status === 'fulfilled') setPayments(paymentsData.value);
      if (complaintsData.status === 'fulfilled') setComplaints(complaintsData.value);
      if (bookingsData.status === 'fulfilled') setBookings(bookingsData.value);
      if (noticesData.status === 'fulfilled') setNotices(noticesData.value);
      if (configData.status === 'fulfilled') setMaintenanceConfig(configData.value);
    } catch (err) {
      console.error('Failed to sync database state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      refreshAllData();
    }
  }, [currentUser]);

  // Auth Functions
  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await api.login(username, password);
      localStorage.setItem('civicnest_token', res.token);
      setToken(res.token);
      setCurrentUser(res.user);
      showToast(`Welcome back, ${res.user.name}! Logged in as ${res.user.role.toUpperCase()}.`);
      return res.user;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      localStorage.setItem('civicnest_token', res.token);
      setToken(res.token);
      setCurrentUser(res.user);
      showToast(`Account registered successfully! Welcome to Smart Society.`);
      return res.user;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('civicnest_token');
    setToken(null);
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  // Quick Demo Role Switcher
  const switchRoleDemo = async (targetRole) => {
    try {
      const username = targetRole === 'admin' ? 'admin' : 'priya';
      await login(username, '123');
    } catch (err) {
      showToast('Failed to switch demo account role', 'error');
    }
  };

  // Business Action Wrappers
  const generateMaintenanceBills = async (payload) => {
    try {
      const res = await api.generateBills(payload);
      showToast(res.message);
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const checkoutPayment = async (payload) => {
    try {
      const res = await api.checkoutPayment(payload);
      showToast(`Payment successful! Receipt No: ${res.payment.receiptNo}`);
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const submitComplaint = async (payload) => {
    try {
      const res = await api.createComplaint(payload);
      showToast(`Complaint ticket #${res.complaint.ticketNo} registered successfully.`);
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const updateComplaint = async (id, payload) => {
    try {
      const res = await api.updateComplaintStatus(id, payload);
      showToast('Complaint ticket updated.');
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const submitHallBooking = async (payload) => {
    try {
      const res = await api.createBooking(payload);
      showToast(`Hall booking request #${res.booking.bookingRef} submitted for approval.`);
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const updateBookingStatus = async (id, payload) => {
    try {
      const res = await api.updateBookingStatus(id, payload);
      showToast(res.message);
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const publishNotice = async (payload) => {
    try {
      const res = await api.createNotice(payload);
      showToast(`Notice #${res.notice.noticeNo} published to society board.`);
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const rsvpNotice = async (noticeId) => {
    try {
      const res = await api.rsvpNotice(noticeId);
      showToast('RSVP / Notice acknowledgement recorded.');
      await refreshAllData();
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  return (
    <SocietyContext.Provider value={{
      darkMode,
      toggleDarkMode,
      activeTab,
      setActiveTab,
      currentUser,
      authLoading,
      loading,
      notification,
      showToast,
      login,
      register,
      logout,
      switchRoleDemo,
      flats,
      bills,
      payments,
      complaints,
      bookings,
      notices,
      maintenanceConfig,
      refreshAllData,
      generateMaintenanceBills,
      checkoutPayment,
      submitComplaint,
      updateComplaint,
      submitHallBooking,
      updateBookingStatus,
      publishNotice,
      rsvpNotice
    }}>
      {children}
    </SocietyContext.Provider>
  );
};

export const useSociety = () => useContext(SocietyContext);
