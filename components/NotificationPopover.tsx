import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
// import NotificationCard from "./NotificationCard";

const NotificationPopover = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} size={"icon"} className="[&_svg]:size-5">
            <Bell />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">通知</h4>
            </div>
            {/* <ScrollArea className="h-[300px]"> */}
            {/* <NotificationCard small /> */}
            {/* </ScrollArea> */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationPopover;
