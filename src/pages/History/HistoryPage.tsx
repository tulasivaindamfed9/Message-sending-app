import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import { useAppSelector } from "../../app/hooks";

import "./HistoryPage.css";

function HistoryPage() {
  const history = useAppSelector(
    (state) => state.history.items,
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date: string | null) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>History</h1>
          <p>
            View messages that were sent, failed, or skipped.
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <Clock3 size={32} />

          <h2>No message history yet</h2>

          <p>
            Your message activity will appear here once the
            scheduler starts running.
          </p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div className="history-item" key={item.id}>
              <div className="history-message">
                <strong>{item.scheduleName}</strong>

                <span>
                  {item.recipientName} · {item.phoneNumber}
                </span>

                <p>{item.message}</p>
              </div>

              <div className="history-date">
                <strong>{formatDate(item.scheduledDate)}</strong>

                <span>
                  {item.sentAt
                    ? `Sent ${formatDateTime(item.sentAt)}`
                    : item.skipReason === "holiday"
                      ? "Skipped: Holiday"
                      : item.skipReason === "excluded-date"
                        ? "Skipped: Excluded date"
                        : "Not sent"}
                </span>
              </div>

              <div
                className={`history-status history-status-${item.status}`}
              >
                {item.status === "sent" && (
                  <>
                    <CheckCircle2 size={15} />
                    Sent
                  </>
                )}

                {item.status === "failed" && (
                  <>
                    <XCircle size={15} />
                    Failed
                  </>
                )}

                {item.status === "skipped" && (
                  <>
                    <Clock3 size={15} />
                    Skipped
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;