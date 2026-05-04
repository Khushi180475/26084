"use client";
import { Card, CardContent, Typography } from "@mui/material";

export default function NotificationCard({ item, viewed }: any) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        background: viewed ? "#ffffff" : "#eaf1ff",
      }}
    >
      <CardContent>
        <Typography variant="h6">{item.notification_type}</Typography>
        <Typography>{item.message}</Typography>
        <Typography sx={{ fontSize: 12, marginTop: 1 }}>
          {item.created_on}
        </Typography>
      </CardContent>
    </Card>
  );
}