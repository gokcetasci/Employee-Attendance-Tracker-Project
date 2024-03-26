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
              { date: "2024-03-27", status: "gelmedi", explanation: "" },
              { date: "2024-03-28", status: "geldi", explanation: "" },
            ] },
            { id: 302, 
              name: "Employee 2",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "izinli", explanation: "İzinli" },
              ]
             },
            { id: 303, 
              name: "Employee 3",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
             },
            { id: 304, 
              name: "Employee 4",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
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
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 306, 
              name: "Employee 6",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
             },
            { id: 307, 
              name: "Employee 7",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 308, 
              name: "Employee 8",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
          ],
        },
      },
      {
        id: 103,
        name: "Branch 3",
        manager: {
          id: 203,
          name: "Manager 3",
          employees: [
            { id: 309, 
              name: "Employee 9",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 310, 
              name: "Employee 10",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 311, 
              name: "Employee 11",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 312, 
              name: "Employee 12",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
          ],
        },
      },
      {
        id: 104,
        name: "Branch 4",
        manager: {
          id: 204,
          name: "Manager 4",
          employees: [
            { id: 313, 
              name: "Employee 13",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
             },
            { id: 314, 
              name: "Employee 14",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 315, 
              name: "Employee 15",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 316, 
              name: "Employee 16",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
          ],
        },
      },
      {
        id: 105,
        name: "Branch 5",
        manager: {
          id: 205,
          name: "Manager 5",
          employees: [
            { id: 317, 
              name: "Employee 17",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 318, 
              name: "Employee 18",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 319, 
              name: "Employee 19",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
              ]
            },
            { id: 320, 
              name: "Employee 20",
              attendance: [
                { date: "2024-03-27", status: "geldi", explanation: "" },
                { date: "2024-03-28", status: "gelmedi", explanation: "İzne çıktı" },
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
