import tkinter as tk
from tkinter import messagebox
import requests

# Función que se llama al presionar el botón
def send_data():
    text = entry.get()
    if not text:
        messagebox.showwarning("Empty Field", "Please enter a numeric value.")
        return

    try:
        # Simula un "fetch" con requests
        response = requests.post(
            "http://ec2-54-226-203-236.compute-1.amazonaws.com:4027/api/create_account/Recover_Password",
            json={"Id": text}
        )

        # Muestra la respuesta
        if response.status_code == 200:
            result = response.json()
            messagebox.showinfo("Success", "The password has been created successfully.")
        else:
            messagebox.showerror("Error", f"Error sending data: {response.status_code}")
    except Exception as e:
        messagebox.showerror("Error", str(e))

# Validación: solo números
def only_numbers(char):
    return char.isdigit()

# Crear la ventana
root = tk.Tk()
root.title("Password Recovery")
root.geometry("360x180")
root.resizable(False, False)
root.configure(bg="#f5f5f5")

# Estilo general
label = tk.Label(root, text="Enter your ID:", font=("Segoe UI", 11), bg="#f5f5f5")
label.pack(pady=(20, 5))

# Registro de validación para solo permitir números
vcmd = (root.register(only_numbers), "%S")
entry = tk.Entry(root, width=30, font=("Segoe UI", 11), validate="key", validatecommand=vcmd)
entry.pack(pady=5)

# Botón con estilo
btn = tk.Button(
    root,
    text="Send",
    command=send_data,
    font=("Segoe UI", 10, "bold"),
    bg="#4CAF50",
    fg="white",
    activebackground="#45A049",
    width=15,
    height=1,
    relief="flat"
)
btn.pack(pady=20)

root.mainloop()
