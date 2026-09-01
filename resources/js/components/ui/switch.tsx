import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    id?: string;
    className?: string;
}

export function Switch({ checked, onCheckedChange, id, className }: SwitchProps) {
    return (
        <HeadlessSwitch
            id={id}
            checked={checked}
            onChange={onCheckedChange}
            className={cn(
                'group relative flex h-7 w-14 cursor-pointer rounded-full bg-slate-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-emerald-600 data-[focus]:outline-1 data-[focus]:outline-white',
                className
            )}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
        </HeadlessSwitch>
    )
}
