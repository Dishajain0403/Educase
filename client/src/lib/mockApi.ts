
// Mock user data
const mockUsers = [
  {
    id: 1,
    fullName: "Marry Doe",
    email: "marry@gmail.com",
    phoneNumber: "+1234567890",
    isAgency: "yes",
    companyName: "PopX Agency"
  }
];

// Mock API functions
export const mockApi = {
  login: async (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error("Invalid credentials");
    return user;
  },

  signup: async (userData: any) => {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    };
    mockUsers.push(newUser);
    return newUser;
  },

  getCurrentUser: async () => {
    return mockUsers[0];
  }
};
