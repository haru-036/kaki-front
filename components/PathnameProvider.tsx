"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const PathnameProvider = () => {
  const params = useParams<{ username: string; projectId: string }>();
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Link href={`/`} className="font-semibold text-sm p-1">
        Dashboard
      </Link>
    );
  } else if (params) {
    if (pathname === `/${params.username}/new`) {
      return <div className="text-sm font-semibold p-1">New Project</div>;
    }
    return (
      <div className="text-sm">
        <Link
          className={`${!params.projectId ? "font-semibold" : ""} p-1`}
          href={`/${params.username}`}
        >
          {params.username}
        </Link>

        {params.projectId && (
          <>
            <span className="text-muted-foreground"> / </span>
            <Link
              className="font-semibold p-1"
              href={`/${params.username}/${params.projectId}`}
            >
              {params.projectId}
            </Link>
          </>
        )}
      </div>
    );
  }

  return <div>{pathname}</div>;
};

export default PathnameProvider;
