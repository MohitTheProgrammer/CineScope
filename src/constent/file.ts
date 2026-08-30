
const avatarUrl = (fileName: string) =>
    `${import.meta.env.BASE_URL}avatars/${fileName}`;

export const AVATARS = [
    {
        id: "avatar-1",
        src: avatarUrl("avatar-1.png"),
    },
    {
        id: "avatar-2",
        src: avatarUrl("avatar-2.png"),
    },
    {
        id: "avatar-3",
        src: avatarUrl("avatar-3.png"),
    },
    {
        id: "avatar-4",
        src: avatarUrl("avatar-4.png"),
    },
    {
        id: "avatar-5",
        src: avatarUrl("avatar-5.png"),
    },
    {
        id: "avatar-6",
        src: avatarUrl("avatar-6.png"),
    },
];
