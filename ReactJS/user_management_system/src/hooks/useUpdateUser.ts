import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { partialUpdate, CompleteUpdate } from "../apis/api";
import { useUserStore } from "../store/userStore";

const useUpdateUser = (onClose: () => void) => {
  const updateUserInStore = useUserStore((state) => state.updateUser);
  const toast = useToast();
  const navigate = useNavigate();

  const completeUpdateMutation = useMutation({
    mutationFn: CompleteUpdate,
    onSuccess: (updatedUser) => {
      updateUserInStore(updatedUser);
      toast({
        title: "Update Successful!",
        description: `User ${updatedUser.first_name} ${updatedUser.last_name} updated successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      navigate("/dashboard/users");
    },
    onError: (error) => {
      toast({
        title: "Update Failed!",
        description: `An error occurred: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const partialUpdateMutation = useMutation({
    mutationFn: partialUpdate,
    onSuccess: (updatedUser) => {
      updateUserInStore(updatedUser);
      toast({
        title: "Partial Update Successful!",
        description: `User ${updatedUser.first_name} ${updatedUser.last_name} partially updated successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      navigate("/dashboard/users");
    },
    onError: (error) => {
      toast({
        title: "Partial Update Failed!",
        description: `An error occurred: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    completeUpdateMutation,
    partialUpdateMutation,
  };
};

export default useUpdateUser;