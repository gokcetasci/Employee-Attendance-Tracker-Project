"use client"
import React from 'react';
import useStore from '@/utils/store';
import GeneralCalendar from '@/components/generalcalendar';

const AdminPage = () => {
  const { admin } = useStore();

  return (
    <div className="container mx-auto ">
      <div>
      {/* Şubeler */}
      <div>
      <h2 className="text-xl font-semibold mb-4">Şubeler</h2>
      <div className='flex flex-row'>
          {admin.branches.map(branch => (
              <div key={branch.id} className="border p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-2">{branch.name}</h3>
                  <p>ID: {branch.id}</p>
                  <p>Müdür: {branch.manager.name}</p>

                  {/* Çalışanlar */}
                  <h4 className="text-md font-semibold mt-2">Çalışanlar</h4>
                  <ul>
                      {branch.manager.employees.map(employee => (
                          <li key={employee.id}>{employee.name}</li>
                      ))}
                  </ul>
              </div>
          ))}
      </div>
      </div>
      </div>

      {/* Admin takvimi */}
      <GeneralCalendar employees={admin.branches.flatMap(branch => branch.manager.employees)} />
    </div>
  );
};

export default AdminPage;

