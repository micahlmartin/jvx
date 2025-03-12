export const sampleOrderData = {
  orderId: 'ORD-2024-1234',
  orderDate: '2024-03-19T10:30:00Z',
  status: 'processing',
  customer: {
    id: 'CUST-789',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    phone: '+1-555-123-4567',
    address: {
      street: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
    },
  },
  items: {
    products: [
      {
        id: 'PROD-001',
        name: 'Mechanical Keyboard',
        price: 149.99,
        quantity: 1,
        category: 'Electronics',
      },
      {
        id: 'PROD-002',
        name: '27-inch Monitor',
        price: 299.99,
        quantity: 2,
        category: 'Electronics',
      },
    ],
    subtotal: 749.97,
    tax: 62.5,
    total: 812.47,
  },
  shipping: {
    method: 'Express',
    carrier: 'FedEx',
    trackingNumber: 'FX-987654321',
    estimatedDelivery: '2024-03-22',
    cost: 15.99,
  },
  payment: {
    method: 'Credit Card',
    status: 'completed',
    transactionId: 'TXN-456789',
    cardType: 'Visa',
    lastFourDigits: '4567',
    billingAddress: {
      sameAsShipping: true,
    },
  },
};
