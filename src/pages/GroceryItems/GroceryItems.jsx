import { useState, useEffect } from "react";
import "./GroceryItems.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GroceryItems = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const tokenExpire = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    let config;
    if (token) {
      config = {
        headers: { "x-access-token": token },
      };
    }
    try {
      axios
        .get("http://localhost:8000/items/getItems", config)
        .then((response) => {
          if (response.data.success) {
            setAddedItems(response.data.data);
          }
        })
        .catch((error) => {
          if (!error.response) {
            toast.error(error.message);
          } else if (!error.response.data.success) {
            // toast.error(error.response.data.message);
            if (error.response.status === 401) {
              tokenExpire();
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addItemHandler = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    let config;
    if (token) {
      config = {
        headers: { "x-access-token": token },
      };
    }
    try {
      axios
        .post("http://localhost:8000/items/addItem", { item }, config)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            setAddedItems([...addedItems, response.data.data]);
            setItem("");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setItem("");
          setLoading(false);
          if (!error.response) {
            return toast.error(error.message);
          }
          if (!error.response.data.success) {
            toast.error(error.response.data.message);
            if (error.response.status === 401) {
              tokenExpire();
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="items-container">
      <div className="items-body">
        <div className="title">Groceries Items</div>
        <div className="add-items">
          <input
            type="text"
            placeholder="Add items here..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItemHandler();
              }
            }}
          />
          <button disabled={loading} className="add-btn" onClick={addItemHandler}>
            Add
          </button>
        </div>
        <div className="items-container-row">
          {addedItems.length === 0 ? <div className="no-items">No items added</div> : ""}
          {addedItems.map((addedItem) => (
            <div key={addedItem._id} className="item">
              {addedItem.itemName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroceryItems;
