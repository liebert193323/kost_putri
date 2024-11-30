import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';

export default () => {
  const { users } = usePage(); // Mengambil data users dari halaman
  const { data, links } = users; // Menyusun data dan link untuk pagination

  // Memisahkan data pengguna menjadi Owner dan Regular Users
  const owners = data.filter(user => user.owner);
  const regularUsers = data.filter(user => !user.owner);

  return (
    <Layout>
      <div>
        <Helmet title="Users" />
        <h1 className="mb-8 text-3xl font-bold">Users</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          {/* Tombol Create hanya muncul untuk Owner */}
          {users.currentUser.owner && (
            <InertiaLink className="btn-indigo" href={route('users.create')}>
              <span>Create</span>
              <span className="hidden md:inline"> User</span>
            </InertiaLink>
          )}
        </div>

        {/* Daftar Owner */}
        <div className="overflow-x-auto bg-white rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Owners</h2>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Name</th>
                <th className="px-6 pt-5 pb-4">Email</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {owners.map(({ id, name, photo, email, owner, deleted_at }) => (
                <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                  <td className="border-t">
                    <InertiaLink
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo-700"
                    >
                      {photo && (
                        <img
                          src={photo}
                          className="block w-5 h-5 mr-2 -my-2 rounded-full"
                        />
                      )}
                      {name}
                      {deleted_at && (
                        <Icon
                          name="trash"
                          className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                        />
                      )}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo"
                    >
                      {email}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo"
                    >
                      {owner ? 'Owner' : 'User'}
                    </InertiaLink>
                  </td>
                  <td className="w-px border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-4"
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </InertiaLink>
                  </td>
                </tr>
              ))}
              {owners.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No owners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Daftar Regular Users */}
        <div className="overflow-x-auto bg-white rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Regular Users</h2>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Name</th>
                <th className="px-6 pt-5 pb-4">Email</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {regularUsers.map(({ id, name, photo, email, owner, deleted_at }) => (
                <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                  <td className="border-t">
                    <InertiaLink
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo-700"
                    >
                      {photo && (
                        <img
                          src={photo}
                          className="block w-5 h-5 mr-2 -my-2 rounded-full"
                        />
                      )}
                      {name}
                      {deleted_at && (
                        <Icon
                          name="trash"
                          className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                        />
                      )}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo"
                    >
                      {email}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo"
                    >
                      {owner ? 'Owner' : 'User'}
                    </InertiaLink>
                  </td>
                  <td className="w-px border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-4"
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </InertiaLink>
                  </td>
                </tr>
              ))}
              {regularUsers.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No regular users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination links={links} />
      </div>
    </Layout>
  );
};
