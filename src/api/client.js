const API_BASE = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('civicnest_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth API
  login: async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Profile fetch failed');
    return data;
  },

  // Society & Flats API
  getSocietyInfo: async () => {
    const res = await fetch(`${API_BASE}/society/info`);
    return await res.json();
  },

  getFlats: async () => {
    const res = await fetch(`${API_BASE}/society/flats`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch flats');
    return data;
  },

  createFlat: async (flatData) => {
    const res = await fetch(`${API_BASE}/society/flats`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(flatData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add flat');
    return data;
  },

  // Maintenance & Billing API
  getMaintenanceConfig: async () => {
    const res = await fetch(`${API_BASE}/maintenance/config`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch maintenance config');
    return data;
  },

  updateMaintenanceConfig: async (configData) => {
    const res = await fetch(`${API_BASE}/maintenance/config`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(configData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update maintenance config');
    return data;
  },

  getBills: async () => {
    const res = await fetch(`${API_BASE}/maintenance/bills`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch bills');
    return data;
  },

  generateBills: async (billPayload) => {
    const res = await fetch(`${API_BASE}/maintenance/generate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(billPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate bills');
    return data;
  },

  // Payments API
  getPaymentHistory: async () => {
    const res = await fetch(`${API_BASE}/payments/history`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch payment history');
    return data;
  },

  checkoutPayment: async (paymentPayload) => {
    const res = await fetch(`${API_BASE}/payments/checkout`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(paymentPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Payment failed');
    return data;
  },

  getReceipt: async (receiptId) => {
    const res = await fetch(`${API_BASE}/payments/receipt/${receiptId}`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch receipt');
    return data;
  },

  // Complaints API
  getComplaints: async () => {
    const res = await fetch(`${API_BASE}/complaints`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch complaints');
    return data;
  },

  createComplaint: async (complaintData) => {
    const res = await fetch(`${API_BASE}/complaints`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(complaintData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit complaint');
    return data;
  },

  updateComplaintStatus: async (id, statusPayload) => {
    const res = await fetch(`${API_BASE}/complaints/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(statusPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update complaint status');
    return data;
  },

  // Hall Bookings API
  getBookings: async () => {
    const res = await fetch(`${API_BASE}/bookings`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch bookings');
    return data;
  },

  checkHallAvailability: async (venue, date, timeSlot) => {
    const query = new URLSearchParams({ venue, date, timeSlot }).toString();
    const res = await fetch(`${API_BASE}/bookings/check-availability?${query}`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to check availability');
    return data;
  },

  createBooking: async (bookingData) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Booking submission failed');
    return data;
  },

  updateBookingStatus: async (id, statusPayload) => {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(statusPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update booking status');
    return data;
  },

  // Notices API
  getNotices: async () => {
    const res = await fetch(`${API_BASE}/notices`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch notices');
    return data;
  },

  createNotice: async (noticeData) => {
    const res = await fetch(`${API_BASE}/notices`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(noticeData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to publish notice');
    return data;
  },

  rsvpNotice: async (noticeId) => {
    const res = await fetch(`${API_BASE}/notices/${noticeId}/rsvp`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'RSVP action failed');
    return data;
  }
};
