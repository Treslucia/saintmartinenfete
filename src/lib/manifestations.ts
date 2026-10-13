export type ManifestationStatus =
  | "draft"
  | "open"
  | "full"
  | "closed"
  | "finished";

interface ManifestationData {
  status: ManifestationStatus;
  date: Date;
  registration?: {
    deadline?: Date;
  };
}

export function getManifestationStatus(
  event: ManifestationData,
): ManifestationStatus {
  // Un brouillon reste toujours un brouillon.
  if (event.status === "draft") {
    return "draft";
  }

  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);

  const dateManifestation = new Date(event.date);
  dateManifestation.setHours(0, 0, 0, 0);

  // Une manifestation dont la date est passée est terminée.
  if (dateManifestation < aujourdHui) {
    return "finished";
  }

  // Ces statuts sont décidés manuellement.
  if (event.status === "full") {
    return "full";
  }

  if (event.status === "closed") {
    return "closed";
  }

  // Pour une manifestation ouverte,
  // la date limite peut automatiquement fermer les inscriptions.
  if (event.status === "open" && event.registration?.deadline) {
    const deadline = new Date(event.registration.deadline);
    deadline.setHours(0, 0, 0, 0);

    if (deadline < aujourdHui) {
      return "closed";
    }
  }

  return event.status;
}