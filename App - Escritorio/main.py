import tkinter as tk
from tkinter import messagebox
import requests

# Function that is called when the button is pressed
def send_data():
    text = entry.get()
    if not text:
        messagebox.showwarning("Empty Field", "Please enter a value.")
        return

    try:
        # Simulates a "fetch" using requests
        response = requests.post("http://personajes-3c74c49f24e14f72.elb.us-east-1.amazonaws.com:4027/api/create_account/Recover_Password", json={"Id": text})

        # Displays the response
        if response.status_code == 200:
            result = response.json()
            messagebox.showinfo("Response", f"Data sent successfully:\n{result['json']}")
        else:
            messagebox.showerror("Error", f"Error sending data: {response.status_code}")
    except Exception as e:
        messagebox.showerror("Error", str(e))

# Tkinter GUI
root = tk.Tk()
root.title("Send Data with Fetch")
root.geometry("300x150")

# Entry
entry = tk.Entry(root, width=30)
entry.pack(pady=10)

# Button
btn = tk.Button(root, text="Send", command=send_data)
btn.pack()

root.mainloop()
