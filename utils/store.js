import { create } from "zustand";

const useStore = create(() => {
  const admin = {
    id: 1,
    name: "Admin",
    branches: [
      {
        id: 101,
        name: "Branch 1",
        manager: {
          id: 201,
          name: "Manager 1",
          employees: [
            { id: 301, 
              name: "Employee 1", 
              attendance: [
                { date: "2024-03-23", status: "geldi", explanation: "" },
              { date: "2024-03-26", status: "gelmedi", explanation: "" },
              { date: "2024-03-27", status: "geldi", explanation: "" },
            ] },
            { id: 302, 
              name: "Employee 2",
              attendance: [
                { date: "2024-02-26", status: "geldi", explanation: "" },
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-11", status: "izinli", explanation: "" },
              ]
             },
            { id: 303, 
              name: "Employee 3",
              attendance: [
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-27", status: "gelmedi", explanation: "" },
              ]
             },
            { id: 304, 
              name: "Employee 4",
              attendance: [
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-27", status: "gelmedi", explanation: "" },
              ]
            },
          ],
        },
      },
      {
        id: 102,
        name: "Branch 2",
        manager: {
          id: 202,
          name: "Manager 2",
          employees: [
            { id: 305, 
              name: "Employee 5",
              attendance: [
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-27", status: "gelmedi", explanation: "" },
              ]
            },
            { id: 306, 
              name: "Employee 6",
              attendance: [
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-27", status: "gelmedi", explanation: "" },
              ]
             },
            { id: 307, 
              name: "Employee 7",
              attendance: [
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-27", status: "gelmedi", explanation: "" },
              ]
            },
            { id: 308, 
              name: "Employee 8",
              attendance: [
                { date: "2024-03-26", status: "geldi", explanation: "" },
                { date: "2024-03-27", status: "gelmedi", explanation: "" },
              ]
            },
          ],
        },
      },
    
    ],
  };

  return {
    admin,
  };
});

export default useStore;
