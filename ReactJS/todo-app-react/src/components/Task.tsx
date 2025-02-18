type TaskProps = {
    task: string;
    onDelete: () => void;
    onEdit: () => void;
}

const Task = ({ task, onDelete,onEdit }: TaskProps) => {

  return (
    <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
                  <p className='font-bold'>{task}</p>
          </div>
          <div className='flex gap-2 m-1'>
            <button className='bg-red-500 text-white p-1 rounded-md' onClick={onDelete}>Delete</button>
            <button className='bg-yellow-500 text-white p-1 rounded-md' onClick={onEdit}>Edit</button>
          </div>
        </div>
      </div>
  )
}

export default Task