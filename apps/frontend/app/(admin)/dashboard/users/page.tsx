import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { Table, Button } from '../../../../components/ui';

const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*');
        if (error) throw error;
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', id);
      if (error) throw error;
      setUsers((prevUsers) => prevUsers.map((user) => user.id === id ? { ...user, role } : user));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User Management</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <Table data={users} columns={['email', 'role', 'actions']} renderRow={(user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button onClick={() => handleRoleChange(user.id, 'admin')}>Promote to Admin</Button>
              <Button onClick={() => handleRoleChange(user.id, 'user')}>Demote to User</Button>
            </td>
          </tr>
        )} />
      )}
    </div>
  );
};

export default UsersManagementPage;
