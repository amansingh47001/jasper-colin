import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div>
      <div>Dashboard</div>
      <Button>Add product</Button>
      <div className="my-3 flex flex-col gap-4">
        {/* {Array.isArray(tasks) &&
        tasks.map((task) => (
          <Link
            href={`/tasks/${task?.id}`}
            key={task?.id}
            className="bg-white dark:bg-neutral-900 border dark:border-neutral-700 p-4 rounded flex flex-col gap-2"
          >
            <div className="flex items-start gap-2">
              <p className="flex-1 text-sm">{task?.title}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <EllipsisVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => router.push(`/tasks/edit-task/${task.id}`)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      dispatch(
                        taskRemoved({
                          id: task?.id,
                        })
                      )
                    }
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex justify-between items-center flex-wrap text-sm">
              <p className="bold text-red-500">Due date: {task?.dueDate}</p>

              <span className="bg-red-500  border border-red-600 text-white px-2 py-1 rounded">
                {task?.priority}
              </span>
            </div>
          </Link>
        ))} */}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
          <div class="flex flex-col gap-3 border border-neutral-400 rounded-md p-4">
            <h6 class="text-xl font-bold text-neutral-800">
              Title of the product
            </h6>
            <p class="text-sm text-neutral-700">
              This is a description of the task. This is a description of the
              task.
            </p>
            <div class="flex justify-between items-center">
              <div class="w-60 space-y-1">
                {/* <select
          formControlName="status"
          id="status"
          [ngClass]="[
            task.status === 'pending'
              ? 'border-yellow-300 bg-yellow-200 text-yellow-800'
              : 'border-green-300 bg-green-200 text-green-800',
            'font-medium border capitalize  p-2 text-sm rounded'
          ]"
          [value]="task.status"
          (change)="handleStatusChange($event, task._id)"
        >
          <option class="bg-white" value="pending">Pending</option>
          <option class="bg-white" value="completed">Completed</option>
        </select> */}
              </div>
              <div class="inline-flex items-center gap-2">
                <Button class="bg-red-600 text-sm hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
