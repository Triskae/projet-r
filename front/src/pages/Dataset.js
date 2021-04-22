import React from 'react';
import Table from "../components/Table/Table";

const people = [
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
  { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
]

const Dataset = () => {
  return (
    <div>
      <h1>Dataset</h1>
      <Table headers={['Name', 'Title', 'Email', 'Role']}>
        {people.map((person, personIdx) => (
          <tr key={person.email} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td>{person.name}</td>
            <td>{person.title}</td>
            <td>{person.email}</td>
            <td>{person.role}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Dataset;
