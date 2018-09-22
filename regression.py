
# coding: utf-8

# In[1]:


import pandas as pd


# In[3]:


df = pd.read_csv("aslyum_by_country_origin2.csv")


# In[4]:


df.head()


# In[6]:


df = df[['cartodb_id', 'name', 'country_or', 'yr_2000',
       'yr_2001', 'yr_2002', 'yr_2003', 'yr_2004', 'yr_2005', 'yr_2006','yr_2007',
       'yr_2008', 'yr_2009', 'yr_2010', 'yr_2011', 'yr_2012', 'yr_2013',
       'yr_2014', 'yr_2015', 'yr_2016', 'yr_2017']]


# In[7]:


df.head()


# In[8]:


df.set_index("cartodb_id")


# In[43]:


x = x.T.fillna(df.mean(axis=1)).T
x


# In[49]:


values = x.values.tolist()
cleanedList = [x for x in values if str(x) != 'nan']
values = values[0][4:]
values
print(range(2000,2017))
values


# In[50]:




