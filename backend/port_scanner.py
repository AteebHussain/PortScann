import socket

def port_scanner(target_host, port_range):
    open_ports = []
    
    for port in range(*port_range):
        try: 
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
            client_socket.settimeout(1)
            result = client_socket.connect_ex((target_host, port))
            if result == 0:
                open_ports.append(port)
            client_socket.close()
        
        except socket.error:
            pass  
    return open_ports

if __name__ == "__main__":
    target_host = input("Enter the target host (IP address or domain): ")
    start_port = int(input("Enter the starting port number: "))
    end_port = int(input("Enter the ending port number: ")) + 1
    
    ports_range = (start_port, end_port)
    
    open_ports = port_scanner(target_host, ports_range)
    
    if open_ports:
        print("Open ports on {}: {}".format(target_host, open_ports))
    else:
        print("No open ports found on {}.".format(target_host))
