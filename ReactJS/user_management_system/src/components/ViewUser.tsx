import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserJob, UserJobResponse } from "../types";
import { updateUser } from "../apis/api";
import { useUserJobStore } from "../store/userJobStore";

interface ViewUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserJobResponse | null;
}

const ViewUser: React.FC<ViewUserProps> = ({ isOpen, onClose, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserJobResponse | null>();
  const { updateUserJob } = useUserJobStore();
  const toast = useToast();
  useEffect(() => {
    setUserData(user);
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserJob }) => updateUser(id, data),
    onSuccess: (res: UserJob, { id }) => {
      updateUserJob(id, res);
      toast({
        title: `User id : ${id} updated Successfully`,
        description: `Status Code : ${res}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
      onClose();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const saveHandler = () => {
    if (userData) {
      updateMutation.mutate({ id: userData.id, data: userData });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {userData && (
            <form>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <Text>{userData.name}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="job">Job</FormLabel>
                {isEditing ? (
                  <Input
                    id="job"
                    name="job"
                    value={userData.job}
                    onChange={handleChange}
                  />
                ) : (
                  <Text>{userData.job}</Text>
                )}
              </FormControl>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <Button colorScheme="blue" onClick={saveHandler}>
              Save
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          <Button onClick={onClose} ml={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewUser;
