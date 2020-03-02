import React from 'react';

interface DatabaseProps {
  title: string;
  sheet: any[][];
}

const Database: React.FC<DatabaseProps> = (props: DatabaseProps) => {
  const headers = props.sheet.length > 0 ? props.sheet[0] : [];

  return (
    <article className="mt-5">
      <h2 className="font-bold text-lg mb-2 text-gray-700 border-b">{props.title}</h2>

      <table className="table-auto mx-auto border mt-5">
        <thead>
          <tr>
            {headers.map((cell, index) => (
              <th key={index} className="border px-4 py-2 text-gray-600">{cell}</th>
            ))}
            <th className="border px-4 py-2 text-red-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.sheet.slice(1, props.sheet.length).map((row, index) => (
            <tr key={index} className="bg-gray-100">
              {headers.map((_, index) => (
                <td key={index} className="border text-center px-4 py-2">{row[index]}</td>
              ))}
              <td className="border px-4 py-2">
                <button className="font-bold border rounded py-2 px-4 text-white bg-orange-400">
                  Modifier
                </button>
                <button className="font-bold border rounded py-2 px-4 text-white bg-red-600">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={props.sheet.length > 0 ? props.sheet[0].length + 1 : 1} className="border text-center px-4 py-2">
              <button className="font-bold bg-green-500 hover:bg-green-400 text-white border rounded px-5 py-2">
                Ajouter
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default Database;
