-- Insert trigger function: create profile with email
CREATE FUNCTION public.handle_new_user_profile()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profile (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_profile();

-- Update trigger function: update email on change
CREATE FUNCTION public.handle_update_user_profile()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profile
  SET email = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update trigger
CREATE TRIGGER on_auth_user_updated
AFTER UPDATE OF email ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_update_user_profile();

-- Delete trigger function
CREATE FUNCTION public.handle_delete_user_profile()
RETURNS trigger AS $$
BEGIN
  DELETE FROM public.profile WHERE id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Delete trigger
CREATE TRIGGER on_auth_user_deleted
AFTER DELETE ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_delete_user_profile();

-- Add cross-schema foreign key: profile.id → auth.users.id
ALTER TABLE public.profile
ADD CONSTRAINT profile_id_fkey
FOREIGN KEY (id) REFERENCES auth.users(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill missing profiles for users (with email)
INSERT INTO public.profile (id, email)
SELECT id, email FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profile);