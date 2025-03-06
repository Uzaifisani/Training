import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { addUser, deleteUser, userById } from "../apis/api";
import { User, SingleUserResponse } from "../types";
import { useUserStore } from "../store/userStore";
import { SubmitHandler } from "react-hook-form";

const useUserActions = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const deleteUserFromStore = useUserStore((state) => state.deleteUserFromStore);
  const addSingleUser= useUserStore((state) => state.addSingleUser);

  const [userData, setUserData] = useState<User | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (resCode: number, id) => {
      deleteUserFromStore(id);
      toast({
        title: "Deleted Successful!",
        description: `User Deleted Successfully, Response Code: ${resCode}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard/users");
    },
    
  });

  const addMutation=useMutation({
      mutationFn:(userDetails:User)=>addUser(userDetails),
      onSuccess:(createdUser:User)=>{
        addSingleUser(createdUser);
        toast({
          title: "User Created Successful!",
          description: `User Name is ${createdUser.first_name} ${createdUser.last_name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/dashboard/users");
      },
      onError:(err)=>{
          toast({
            title: "Failed!!",
            description: `Sorry, we are unable to Add New user, Error: ${err}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/dashboard/users");
      },
      onMutate:()=>{
        console.log("Adding....");
      }
    });

  const { data, isLoading, isSuccess, isError } = useQuery<SingleUserResponse>({
    queryKey: ["user", id],
    queryFn: () => userById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUserData(data.data);
    }
  }, [isSuccess, data]);

  const handleBack = () => {
    navigate("/dashboard/users");
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = () => {
    // Implement update functionality
  };
  const onSubmitAddUser: SubmitHandler<User> = data => {
    addMutation.mutate(data);
  };

  return {
    userData,
    isLoading,
    isError,
    handleBack,
    handleDelete,
    handleUpdate,
    addMutation,
    onSubmitAddUser
  };
};

export default useUserActions;