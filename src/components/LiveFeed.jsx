import { Flame, Hand } from "lucide-react";
import { FiCircle } from "react-icons/fi"

function LiveFeed() {
  const feedItems = [
    {
      avatar: "https://s3-alpha-sig.figma.com/img/ad23/2f1a/673fe1645ff06837351bc6292fd60f72?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VVDq6rfQ2pWWTaAOpfg8tli0UbUgcDVHfFCIY7aJsQ93u9eSOdHxJMbBfGkZGbcw1gkl5Pdqfvp4VlKR-NUq4MesVpJtlCZY~kEf09IG6ryLnYULwWPfmy3VUrg0UanQQzpvb31sq3Lpdv0Bzjaccq56B1Nbdg5TB5XQWmCM6taNTrqCTQwNh7e9k~xQaBsh80nmLp6jzaUW61hj7i8POSXayfkWVpDOUuazUmb~GbMfscuO27o1ReIRRpn0m2ztRpbNtSAvi-tpzZx6V3bVqhoHAnfubJ-vGHPvDaX2MSokCbwAJZ8WW2ulnpW73XTuo8tZjdasWOBsmkt6Rz9~YQ__",
      name: "Benjamin Cooper",
      role: "CEO @ Meta Inc.",
      subject: "Re: Meeting with Lead",
      status: "Clicked",
      color: "text-purple-500",
      bg: "bg-[#f5edff]",
      time: "5s ago",
    },
    {
      avatar: "https://s3-alpha-sig.figma.com/img/86c2/8a12/4c67bf4716e380d4c59dcf22f991a46b?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XxPJjT7xtNP8qIm0sJXF4HMux5R4f9Zxd~HujoUQ65DNg0IGAwZjWjR1KbX~PwzLTpKJ7NEu8BlyrMwpURF0aN1fN8tbW9RvhHPzHARmGFkKuQ0vEuhguGI4FpUcyvmAJ6CuPsTuKMmgTmtbodgCNPXPEyMDsCSrDG2dZXYg~aYpYnyUGqCh~kHm5szmUvnq7rdNN26EWjBzoObHvIAUylYi5TTc3K0U9bBt-QnmALP~aK5ctcByuhzw8IaLUkPI~342fIjb7b~dsj4ula1dwsnwv6EopB00XeMUQdA2gOlEppDd6FbXWU7RUd5vhQTFd68y4a~-LmBdowRT0BSh8Q__",
      name: "Casper Nelly",
      role: "Sales manager @ pwc",
      subject: "Re: sales marketing",
      status: "Hot Lead",
      color: "text-orange-500",
      bg: "bg-[#fff3e6]",
      time: "7 hrs ago",
    },
    {
      avatar: "https://s3-alpha-sig.figma.com/img/cbbe/ed5b/25576aa490309af20745987661e2bd74?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AAfvHxzNO7Alrt2-Kk2YPqQAqQZAVsHm3ssdPVr02meOODsYlEWREPrUVyBqO8h8a6L8WwWv1~QMQ-1IAFzned9gxSvUh0nXyR41hMJPvFCgrbeOL0IgfsHm~sZIZiCSQQFX7-cUEVhXA0vEgtMJWbQP-A0vAXGElnKvFmsS-onZ7dBmsv~uUjJQAvXPIl4rT4oC0CHQT4KHJLbH4~8IkM31WeU0IGGlK88rloAU9PhkvjTRHxI4oqe~vw1H96PyTg0nl4T-cUFjAeRd6WpTRr14JCET2JEfbhMyr3vxvq7bowdgJNWqVlA53I7PvRc9QfAsPy84kKCDUn8V74o-9A__",
      name: "Philip Oroni",
      role: "Designer @ QuickPipe AI",
      subject: "Re: Email about design work",
      status: "Opened",
      color: "text-green-300",
      bg: "bg-[#ebf6ee]",
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-4">
      {feedItems.map((item, i) => (
        <div key={i}>
        <div className="flex items-start gap-3">
          <img src={item.avatar || "/placeholder.svg"} alt={item.name} className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.role}</span>
            </div>
            <div className="text-sm">{item.subject}</div>
            <div className="flex items-center gap-2">
              <div className={`${item.bg} rounded-full flex gap-1 p-1.5 items-center`}>
                <Flame size={20} className={`fill-current ${item.color}`}/>
                <span className="text-xs">{item.status}</span>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        </div>
      ))}
    </div>
  )
}

export default LiveFeed;