import { Icon } from "@iconify/react";

export default function PaymentFeature() {
  return (
    <ul className="space-y-3 text-sm text-gray-600">
      {[
        "Unlimited projects",
        "Team collaboration",
        "Advanced analytics",
        "Priority email support",
      ].map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Icon icon="mdi:check-circle" className="text-green-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}
