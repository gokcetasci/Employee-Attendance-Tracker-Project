import { create } from "zustand";

const useStore = create(() => {
  const admin = {
    id: 1,
    name: "John Doe",
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
                { date: "2024-04-06", status: "İzinli", explanation: "" },
                { date: "2024-04-04", status: "Geldi", explanation: "" },
              { date: "2024-03-26", status: "Gelmedi", explanation: "saha araştırması için göreve gitti" },
              { date: "2024-03-27", status: "Gelmedi", explanation: "saha araştırması için göreve gitti" },
            ] },
            { id: 302, 
              name: "Employee 2",
              attendance: [
                { date: "2024-02-25", status: "Geldi", explanation: "" },
                { date: "2024-03-26", status: "Gelmedi", explanation: "" },
                { date: "2024-03-11", status: "İzinli", explanation: "" },
              ]
             },
            { id: 303, 
              name: "Employee 3",
              attendance: [
                { date: "2024-03-26", status: "Geldi", explanation: "" },
                { date: "2024-03-27", status: "Gelmedi", explanation: "" },
              ]
             },
            { id: 304, 
              name: "Employee 4",
              attendance: [
                { date: "2024-03-26", status: "Geldi", explanation: "" },
                { date: "2024-03-27", status: "Gelmedi", explanation: "" },
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
                { date: "2024-03-26", status: "Geldi", explanation: "" },
                { date: "2024-03-27", status: "Gelmedi", explanation: "" },
              ]
            },
            { id: 306, 
              name: "Employee 6",
              attendance: [
                { date: "2024-03-26", status: "Geldi", explanation: "" },
                { date: "2024-03-27", status: "Gelmedi", explanation: "" },
              ]
             },
            { id: 307, 
              name: "Employee 7",
              attendance: [
                { date: "2024-03-26", status: "Geldi", explanation: "" },
                { date: "2024-03-27", status: "Gelmedi", explanation: "" },
              ]
            },
            { id: 308, 
              name: "Employee 8",
              attendance: [
                { date: "2024-03-26", status: "Geldi", explanation: "" },
                { date: "2024-03-27", status: "Gelmedi", explanation: "" },
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
