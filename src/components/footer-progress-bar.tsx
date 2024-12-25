export type StepsType = {
  name: string;
  description?: string;
  status: "completed" | "active" | "pending";
};

export default function FooterProgressBar({ STEPS }: { STEPS: StepsType[] }) {
  return (
    <div className="sticky bottom-0 z-50 h-fit w-full bg-[#FAFAFA80] p-[32px] backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-center gap-[12px]">
        <div className="grid w-full grid-flow-col place-items-center">
          {STEPS.map((step, index) => (
            <div
              className="relative z-0 flex w-full justify-center"
              key={step.name + step.status + index}
            >
              <div className="h-[24px] w-[24px]">
                {step.status === "completed" ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1139_80037)">
                      <rect width="24" height="24" rx="12" fill="#F9F5FF" />
                      <rect
                        x="0.75"
                        y="0.75"
                        width="22.5"
                        height="22.5"
                        rx="11.25"
                        fill="#7F56D9"
                      />
                      <rect
                        x="0.75"
                        y="0.75"
                        width="22.5"
                        height="22.5"
                        rx="11.25"
                        stroke="#7F56D9"
                        strokeWidth="1.5"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.0964 7.39004L9.93638 14.3L8.03638 12.27C7.68638 11.94 7.13638 11.92 6.73638 12.2C6.34638 12.49 6.23638 13 6.47638 13.41L8.72638 17.07C8.94638 17.41 9.32638 17.62 9.75638 17.62C10.1664 17.62 10.5564 17.41 10.7764 17.07C11.1364 16.6 18.0064 8.41004 18.0064 8.41004C18.9064 7.49004 17.8164 6.68004 17.0964 7.38004V7.39004Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1139_80037">
                        <rect width="24" height="24" rx="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : step.status === "active" ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-[-4px]"
                  >
                    <g filter="url(#filter0_d_1139_79866)">
                      <g clipPath="url(#clip0_1139_79866)">
                        <circle cx="16" cy="16" r="12" fill="#F9F5FF" />
                        <circle cx="16" cy="16" r="11.25" fill="#7F56D9" />
                        <circle
                          cx="16"
                          cy="16"
                          r="11.25"
                          stroke="#7F56D9"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <circle cx="16" cy="16" r="4" fill="white" />
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1139_79866"
                        x="0"
                        y="0"
                        width="32"
                        height="32"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feMorphology
                          radius="3"
                          operator="dilate"
                          in="SourceAlpha"
                          result="effect1_dropShadow_1139_79866"
                        />
                        <feOffset />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.619152 0 0 0 0 0.465529 0 0 0 0 0.930549 0 0 0 0.24 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1139_79866"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1139_79866"
                          result="shape"
                        />
                      </filter>
                      <clipPath id="clip0_1139_79866">
                        <rect
                          x="4"
                          y="4"
                          width="24"
                          height="24"
                          rx="12"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1139_80097)">
                      <rect width="24" height="24" rx="12" fill="white" />
                      <rect
                        x="0.75"
                        y="0.75"
                        width="22.5"
                        height="22.5"
                        rx="11.25"
                        stroke="#EAECF0"
                        strokeWidth="1.5"
                      />
                      <circle cx="12" cy="12" r="4" fill="#D0D5DD" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1139_80097">
                        <rect width="24" height="24" rx="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`absolute z-[-1] mt-[12px] h-[2px] w-full translate-x-1/2 ${
                    STEPS[index].status === "completed"
                      ? "bg-simpleBlue"
                      : "bg-simpleGray200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="grid w-full grid-flow-col place-items-center">
          {STEPS.map((step, index) => (
            <div
              key={step.name + index}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`text-[14px] font-semibold leading-[20px] ${step.status === "active" ? "text-simpleBlue" : "text-simpleGray700"}`}
              >
                {step.name}
              </div>
              <div
                className={`text-[14px] font-normal leading-[20px] ${step.status === "active" ? "text-simpleBlue" : "text-simpleGray600"}`}
              >
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
