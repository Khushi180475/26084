Stage 1 — Priority Inbox Design
Objective

Users reported that important notifications get buried due to high volume.
We need a Priority Inbox that always shows the Top 10 most important unread notifications.

Priority depends on:

Weight
Placement → 3
Result → 2
Event → 1
Recency (newer = higher priority)

We must fetch notifications from the API and compute the top 10 without storing in DB.

Approach
1. Fetch Notifications

We call the API:

GET /evaluation-service/notifications

Using a Bearer Token.

2. Assign Priority Score

Formula:

priority_score = (weight × 1e12) + timestamp_ms

Why this works?

weight × 1e12 ensures category importance dominates
Adding timestamp preserves recency ordering inside same type
Combining both gives a single sortable score
3. Sort & Retrieve Top 10

We sort all notifications in descending order of priority_score:

sorted = notifications.sort((a, b) => score(b) - score(a))

Pick the top 10.

4. Efficient Handling of New Incoming Notifications

New notifications keep coming. Sorting every time is inefficient for large data.

Efficient Strategy: Min-Heap of Size 10
Maintain a min-heap of top 10
For each new notification:
Compute score
If heap has <10 items → push notification
Else if score > heap.min → pop min, insert new
Heap always contains the top 10
Time complexity becomes O(n log 10) → effectively O(n)

This is optimal and scalable.

5. Technology Choice

I used Node.js (JavaScript) because:

Lightweight
Good for APIs
Easy sorting & heap structures
6. Screenshots

![stage 1 output](image.png)