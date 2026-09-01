export const initialData = {
  societyInfo: {
    name: "Smart Society Residency & Heights",
    address: "Plot 42, Sector 18, Palm Beach Road, Navi Mumbai - 400706",
    registrationNo: "HSG/NMB/2021/8492",
    totalFlats: 48,
    blocks: ["Block A", "Block B", "Block C", "Block D"],
  },

  maintenanceConfig: {
    sqftRate: 2.5,        // ₹ per sqft
    fixedWaterCharge: 400,
    elevatorCharge: 350,
    securityCharge: 600,
    parkingCharge: 300,
    lateFeeGraceDays: 10,
    lateFeeAmount: 250,
  },

  users: [
    {
      id: "u-admin-1",
      username: "admin",
      password: "123",
      name: "Rajesh Sharma",
      role: "admin",
      designation: "Society General Secretary",
      email: "secretary@smartsociety.org",
      phone: "+91 98201 44321",
      flatNumber: "A-501",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "u-admin-2",
      username: "treasurer",
      password: "123",
      name: "Vikram Seth",
      role: "admin",
      designation: "Society Treasurer",
      email: "treasurer@smartsociety.org",
      phone: "+91 98192 11092",
      flatNumber: "B-402",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "u-res-1",
      username: "priya",
      password: "123",
      name: "Priya Patel",
      role: "resident",
      designation: "Resident Owner",
      email: "priya.patel@gmail.com",
      phone: "+91 99870 12345",
      flatNumber: "A-402",
      block: "Block A",
      sqft: 1250,
      flatType: "3 BHK",
      residentType: "Owner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "u-res-2",
      username: "amitabh",
      password: "123",
      name: "Amitabh Roy",
      role: "resident",
      designation: "Resident Tenant",
      email: "amitabh.roy@yahoo.com",
      phone: "+91 98205 67890",
      flatNumber: "B-102",
      block: "Block B",
      sqft: 950,
      flatType: "2 BHK",
      residentType: "Tenant",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "u-res-3",
      username: "neha",
      password: "123",
      name: "Neha Kulkarni",
      role: "resident",
      designation: "Resident Owner",
      email: "neha.k@outlook.com",
      phone: "+91 97690 44556",
      flatNumber: "C-303",
      block: "Block C",
      sqft: 1400,
      flatType: "3 BHK",
      residentType: "Owner",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    }
  ],

  flats: [
    { flatNumber: "A-101", ownerName: "Suresh Menon", block: "Block A", sqft: 1100, flatType: "2 BHK", residentType: "Owner", phone: "+91 98112 00101", status: "Occupied" },
    { flatNumber: "A-102", ownerName: "Rohan Deshmukh", block: "Block A", sqft: 1250, flatType: "3 BHK", residentType: "Owner", phone: "+91 98112 00102", status: "Occupied" },
    { flatNumber: "A-402", ownerName: "Priya Patel", block: "Block A", sqft: 1250, flatType: "3 BHK", residentType: "Owner", phone: "+91 99870 12345", status: "Occupied" },
    { flatNumber: "A-501", ownerName: "Rajesh Sharma", block: "Block A", sqft: 1600, flatType: "Penthouse", residentType: "Owner", phone: "+91 98201 44321", status: "Occupied" },
    { flatNumber: "B-102", ownerName: "Amitabh Roy", block: "Block B", sqft: 950, flatType: "2 BHK", residentType: "Tenant", phone: "+91 98205 67890", status: "Occupied" },
    { flatNumber: "B-402", ownerName: "Vikram Seth", block: "Block B", sqft: 1300, flatType: "3 BHK", residentType: "Owner", phone: "+91 98192 11092", status: "Occupied" },
    { flatNumber: "C-303", ownerName: "Neha Kulkarni", block: "Block C", sqft: 1400, flatType: "3 BHK", residentType: "Owner", phone: "+91 97690 44556", status: "Occupied" },
    { flatNumber: "D-201", ownerName: "Ananya Sen", block: "Block D", sqft: 1050, flatType: "2 BHK", residentType: "Tenant", phone: "+91 98300 11223", status: "Occupied" },
    { flatNumber: "D-404", ownerName: "Karan Johar", block: "Block D", sqft: 1200, flatType: "3 BHK", residentType: "Owner", phone: "+91 98210 99887", status: "Vacant" }
  ],

  bills: [
    {
      id: "bill-2026-08-A402",
      invoiceNo: "INV-2026-08-014",
      flatNumber: "A-402",
      residentName: "Priya Patel",
      billPeriod: "August 2026",
      issueDate: "2026-08-01",
      dueDate: "2026-08-15",
      sqft: 1250,
      sqftCharge: 3125,        // 1250 * 2.5
      waterCharge: 400,
      elevatorCharge: 350,
      securityCharge: 600,
      parkingCharge: 300,
      debitNoteCharge: 500,     // Special Independence Day festival fund
      debitNoteReason: "Independence Day & Cultural Event Fund",
      lateFee: 0,
      totalAmount: 5275,
      status: "PENDING",        // PENDING, PAID, OVERDUE
      paidDate: null,
      paymentMethod: null,
      transactionId: null
    },
    {
      id: "bill-2026-07-A402",
      invoiceNo: "INV-2026-07-014",
      flatNumber: "A-402",
      residentName: "Priya Patel",
      billPeriod: "July 2026",
      issueDate: "2026-07-01",
      dueDate: "2026-07-15",
      sqft: 1250,
      sqftCharge: 3125,
      waterCharge: 400,
      elevatorCharge: 350,
      securityCharge: 600,
      parkingCharge: 300,
      debitNoteCharge: 0,
      debitNoteReason: "",
      lateFee: 0,
      totalAmount: 4775,
      status: "PAID",
      paidDate: "2026-07-10",
      paymentMethod: "UPI (GooglePay)",
      transactionId: "UPI9823104928"
    },
    {
      id: "bill-2026-08-B102",
      invoiceNo: "INV-2026-08-022",
      flatNumber: "B-102",
      residentName: "Amitabh Roy",
      billPeriod: "August 2026",
      issueDate: "2026-08-01",
      dueDate: "2026-08-15",
      sqft: 950,
      sqftCharge: 2375,
      waterCharge: 400,
      elevatorCharge: 350,
      securityCharge: 600,
      parkingCharge: 300,
      debitNoteCharge: 500,
      debitNoteReason: "Independence Day & Cultural Event Fund",
      lateFee: 0,
      totalAmount: 4525,
      status: "PENDING",
      paidDate: null,
      paymentMethod: null,
      transactionId: null
    },
    {
      id: "bill-2026-06-B102",
      invoiceNo: "INV-2026-06-022",
      flatNumber: "B-102",
      residentName: "Amitabh Roy",
      billPeriod: "June 2026",
      issueDate: "2026-06-01",
      dueDate: "2026-06-15",
      sqft: 950,
      sqftCharge: 2375,
      waterCharge: 400,
      elevatorCharge: 350,
      securityCharge: 600,
      parkingCharge: 300,
      debitNoteCharge: 1000,
      debitNoteReason: "Monsoon Roof Waterproofing Special Debit",
      lateFee: 250,
      totalAmount: 5275,
      status: "OVERDUE",
      paidDate: null,
      paymentMethod: null,
      transactionId: null
    },
    {
      id: "bill-2026-08-C303",
      invoiceNo: "INV-2026-08-038",
      flatNumber: "C-303",
      residentName: "Neha Kulkarni",
      billPeriod: "August 2026",
      issueDate: "2026-08-01",
      dueDate: "2026-08-15",
      sqft: 1400,
      sqftCharge: 3500,
      waterCharge: 400,
      elevatorCharge: 350,
      securityCharge: 600,
      parkingCharge: 300,
      debitNoteCharge: 500,
      debitNoteReason: "Independence Day & Cultural Event Fund",
      lateFee: 0,
      totalAmount: 5650,
      status: "PAID",
      paidDate: "2026-08-02",
      paymentMethod: "HDFC Credit Card",
      transactionId: "TXN7781920041"
    }
  ],

  paymentsHistory: [
    {
      id: "pay-101",
      billId: "bill-2026-07-A402",
      invoiceNo: "INV-2026-07-014",
      flatNumber: "A-402",
      residentName: "Priya Patel",
      amountPaid: 4775,
      paymentDate: "2026-07-10",
      paymentMode: "UPI",
      provider: "Google Pay",
      txnRef: "UPI9823104928",
      receiptNo: "RCP-2026-0791",
      status: "SUCCESS"
    },
    {
      id: "pay-102",
      billId: "bill-2026-08-C303",
      invoiceNo: "INV-2026-08-038",
      flatNumber: "C-303",
      residentName: "Neha Kulkarni",
      amountPaid: 5650,
      paymentDate: "2026-08-02",
      paymentMode: "CREDIT_CARD",
      provider: "HDFC Bank",
      txnRef: "TXN7781920041",
      receiptNo: "RCP-2026-0805",
      status: "SUCCESS"
    }
  ],

  complaints: [
    {
      id: "cmp-001",
      ticketNo: "TKT-2026-801",
      flatNumber: "A-402",
      residentName: "Priya Patel",
      title: "Elevator 2 Making Grinding Noise",
      category: "Elevator",
      priority: "High",
      description: "Elevator 2 in Block A produces a screeching noise between 3rd and 5th floors. Needs urgent inspection by technician.",
      dateFiled: "2026-07-28",
      status: "In Progress",        // Pending, In Progress, Resolved
      assignedStaff: "Otis Elevator Engineer - Ramesh",
      adminNotes: "Technician visited on July 30. Replacement bearing part ordered, installation scheduled for Aug 3.",
      history: [
        { date: "2026-07-28 10:15 AM", note: "Ticket submitted by resident" },
        { date: "2026-07-29 02:30 PM", note: "Status changed to In Progress by Admin Rajesh Sharma" }
      ]
    },
    {
      id: "cmp-002",
      ticketNo: "TKT-2026-802",
      flatNumber: "B-102",
      residentName: "Amitabh Roy",
      title: "Water Seepage in Balcony",
      category: "Plumbing",
      priority: "Medium",
      description: "Rainwater is pooling near balcony drain and leaking down to B-002 balcony ceiling during heavy showers.",
      dateFiled: "2026-07-30",
      status: "Pending",
      assignedStaff: "Society Plumber - Mahesh",
      adminNotes: "",
      history: [
        { date: "2026-07-30 04:45 PM", note: "Ticket submitted by resident" }
      ]
    },
    {
      id: "cmp-003",
      ticketNo: "TKT-2026-709",
      flatNumber: "C-303",
      residentName: "Neha Kulkarni",
      title: "Parking Slot B-14 Obstruction",
      category: "Security",
      priority: "Low",
      description: "A guest vehicle (MH-04-AB-9921) was parked in my designated slot without notice.",
      dateFiled: "2026-07-20",
      status: "Resolved",
      assignedStaff: "Security Guard Desk",
      adminNotes: "Security guard contacted guest owner and vehicle was moved to guest parking bay.",
      history: [
        { date: "2026-07-20 08:00 AM", note: "Ticket submitted" },
        { date: "2026-07-20 09:30 AM", note: "Resolved by Gate Guard Suresh" }
      ]
    }
  ],

  hallBookings: [
    {
      id: "hb-101",
      bookingRef: "HB-2026-081",
      flatNumber: "A-402",
      residentName: "Priya Patel",
      venue: "Main Clubhouse Community Hall",
      eventType: "Birthday Party",
      eventTitle: "Aarav's 5th Birthday Party",
      bookingDate: "2026-08-20",
      timeSlot: "Evening (4:00 PM - 10:00 PM)",
      guestCount: 65,
      totalFee: 3500,
      status: "Approved",      // Pending, Approved, Rejected
      adminRemarks: "Approved by Secretary. Please ensure DJ music volume is reduced by 9:30 PM.",
      dateRequested: "2026-07-25"
    },
    {
      id: "hb-102",
      bookingRef: "HB-2026-082",
      flatNumber: "C-303",
      residentName: "Neha Kulkarni",
      venue: "Terrace Event Deck",
      eventType: "Ring Ceremony",
      eventTitle: "Rohan & Sneha Ring Ceremony",
      bookingDate: "2026-09-05",
      timeSlot: "Full Day (9:00 AM - 10:00 PM)",
      guestCount: 110,
      totalFee: 6000,
      status: "Pending",
      adminRemarks: "",
      dateRequested: "2026-08-01"
    }
  ],

  notices: [
    {
      id: "not-001",
      noticeNo: "NOT-2026-089",
      title: "Annual General Body Meeting (AGM) 2026 Announcement",
      category: "Meeting Announcement",
      priority: "Urgent",
      datePosted: "2026-07-29",
      postedBy: "Rajesh Sharma (Secretary)",
      content: "All residents and flat owners are hereby informed that the Annual General Body Meeting (AGM) for FY 2025-26 will be held on Sunday, August 16, 2026 at 10:30 AM in the Society Clubhouse. Agenda includes financial audit presentation, rooftop solar project approval, and security vendor renewal.",
      isDoorToDoorReplacement: true,
      rsvpCount: 28,
      acknowledgements: ["A-402", "C-303", "A-501", "B-402"]
    },
    {
      id: "not-002",
      noticeNo: "NOT-2026-088",
      title: "Independence Day Cultural Festival & Flag Hoisting",
      category: "Festival Event",
      priority: "Normal",
      datePosted: "2026-07-27",
      postedBy: "Cultural Committee",
      content: "Join us for Flag Hoisting at 8:30 AM on August 15th at the Society Main Lawn, followed by kids drawing competition and evening cultural performances. Refreshments will be served.",
      isDoorToDoorReplacement: false,
      rsvpCount: 42,
      acknowledgements: ["A-402", "B-102", "C-303"]
    },
    {
      id: "not-003",
      noticeNo: "NOT-2026-085",
      title: "Monsoon Water Tank Deep Cleaning Schedule",
      category: "Maintenance Update",
      priority: "High",
      datePosted: "2026-07-22",
      postedBy: "Society Office",
      content: "Underground & Overhead water tanks will be drained and disinfected on Wednesday, August 5 between 9:00 AM and 4:00 PM. Water supply will remain suspended during these hours. Please store adequate water in advance.",
      isDoorToDoorReplacement: false,
      rsvpCount: 35,
      acknowledgements: ["A-402", "B-102", "C-303", "D-201"]
    }
  ],

  emergencyContacts: [
    { title: "Main Gate Security Desk", name: "Suresh (Head Guard)", phone: "+91 98200 00001", available: "24/7" },
    { title: "Society Plumber", name: "Mahesh Electric & Plumbing", phone: "+91 98200 00002", available: "8 AM - 8 PM" },
    { title: "Electrician", name: "Rajesh Electricals", phone: "+91 98200 00003", available: "8 AM - 9 PM" },
    { title: "Elevator Emergency Tech", name: "Otis Elevator Helpline", phone: "1800 233 4545", available: "24/7" },
    { title: "General Secretary", name: "Rajesh Sharma (A-501)", phone: "+91 98201 44321", available: "9 AM - 7 PM" }
  ]
};
