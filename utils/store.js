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
            { id: 301, name: "Employee 1" },
            { id: 302, name: "Employee 2" },
            { id: 303, name: "Employee 3" },
            { id: 304, name: "Employee 4" },
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
            { id: 305, name: "Employee 5" },
            { id: 306, name: "Employee 6" },
            { id: 307, name: "Employee 7" },
            { id: 308, name: "Employee 8" },
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
            { id: 309, name: "Employee 9" },
            { id: 310, name: "Employee 10" },
            { id: 311, name: "Employee 11" },
            { id: 312, name: "Employee 12" },
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
            { id: 313, name: "Employee 13" },
            { id: 314, name: "Employee 14" },
            { id: 315, name: "Employee 15" },
            { id: 316, name: "Employee 16" },
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
            { id: 317, name: "Employee 17" },
            { id: 318, name: "Employee 18" },
            { id: 319, name: "Employee 19" },
            { id: 320, name: "Employee 20" },
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
