import { useMutation } from '@apollo/client';
import { deleteUserMutation } from '../qraphql/mutations';
import { toast } from 'react-toastify';
import { userErrors } from '../errors';

export default function useDeleteUser() {
  const [deleteUser] = useMutation(deleteUserMutation);

  return function (userId: number) {
    return deleteUser({
      variables: {
        id: userId,
      },
    })
      .then(() => {
        toast('Пользователь успешно удален', {
          type: toast.TYPE.SUCCESS,
        });
      })
      .catch(() =>
        toast(userErrors.userDeleting, {
          type: toast.TYPE.ERROR,
        })
      );
  };
}
