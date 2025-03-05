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
import { useForm, SubmitHandler } from "react-hook-form";
import { UserJob, UserJobResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../apis/api";
import { useUserJobStore } from "../store/userJobStore";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm<UserJob>();
  const {addUserJob}= useUserJobStore();
  const toast= useToast();

  const AddJobMutation=useMutation({
    mutationFn:(data:UserJob)=>createUser(data),
    onSuccess:(res:UserJobResponse)=>{
        addUserJob(res);
        toast({
            title: "User Job Added Successfully",
            description: `Added, ${res.job}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          reset();
          onClose();
    },
    onError:(err)=>{
        toast({
            title: "Job Adding Failed!!",
            description: `${err}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
    }
  })

  const onSubmit: SubmitHandler<UserJob> = (data) => {
    AddJobMutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <Text color="red.500">{errors.name.message}</Text>}
            </FormControl>

            <FormControl isInvalid={!!errors.job} mt={4}>
              <FormLabel htmlFor="job">Job</FormLabel>
              <Input
                id="job"
                placeholder="Job"
                {...register("job", { required: "Job is required" })}
              />
              {errors.job && <Text color="red.500">{errors.job.message}</Text>}
            </FormControl>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddJobModal;
