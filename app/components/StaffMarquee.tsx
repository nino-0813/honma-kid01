import Image from "next/image";
import { STAFF_MEMBERS } from "@/app/components/staffData";

function StaffCard({
  role,
  name,
  reading,
  bio,
  image,
}: {
  role: string;
  name: string;
  reading: string;
  bio: string;
  image: string;
}) {
  return (
    <article className="w-[min(280px,78vw)] shrink-0 rounded-[24px] bg-[#f7f7f7] p-3 shadow-[0_10px_36px_rgba(20,35,55,0.09)] ring-1 ring-black/[0.04]">
      <div className="overflow-hidden rounded-[18px] bg-[#eee]">
        <Image
          src={image}
          alt=""
          width={560}
          height={360}
          className="aspect-[5/3] h-auto w-full object-cover"
          sizes="280px"
        />
      </div>
      <div className="px-1.5 pb-1 pt-4 text-left md:px-2 md:pt-5">
        <p className="text-[12px] font-medium tracking-[0.06em] text-[#5a8a9e] md:text-[13px]">
          {role}
        </p>
        <p className="mt-1.5 text-[17px] font-semibold leading-tight tracking-[0.06em] text-[#222] md:text-[18px]">
          {name}
          <span className="ml-1 text-[12px] font-normal tracking-[0.04em] text-[#666] md:text-[13px]">
            （{reading}）
          </span>
        </p>
        <p className="mt-3 text-[15px] leading-[1.85] tracking-[0.1em] text-[#444]/85">
          {bio}
        </p>
      </div>
    </article>
  );
}

export default function StaffMarquee() {
  const loop = [...STAFF_MEMBERS, ...STAFF_MEMBERS];

  return (
    <div className="staff-marquee-outer relative overflow-hidden py-2 touch-pan-x overscroll-contain">
      {/* 左右を軽くフェードしてカルーセル感 */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-white to-transparent md:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-white to-transparent md:w-16"
        aria-hidden
      />

      <div className="staff-marquee-track">
        {loop.map((m, i) => (
          <StaffCard
            key={`${m.id}-${i}`}
            role={m.role}
            name={m.name}
            reading={m.reading}
            bio={m.bio}
            image={m.image}
          />
        ))}
      </div>
    </div>
  );
}
